from django.shortcuts import render,get_object_or_404
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import RegisterSerializer,SeatBookingSerializer,CreateBusSerializer,DetailBusSerializer
from account.models import Account
from bus.models import Seat,Bus,BookingDetail,Passenger
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from django.db import transaction



# Create your views here.

class CreateAccount(generics.CreateAPIView):
    permission_classes=[AllowAny]
    serializer_class=RegisterSerializer
    queryset=Account.objects.all()

class BookTicket(generics.UpdateAPIView):
    #permission_classes=[IsAuthenticated]
    serializer_class=SeatBookingSerializer
    queryset=Seat.objects.all()
    lookup_field='pk'

    
class CreateBus(generics.ListCreateAPIView):
    serializer_class=CreateBusSerializer
    queryset=Bus.objects.all()

    def perform_create(self, serializer):
        bus=serializer.save()
        number_of_seats=bus.number_of_seats
        seats=[]
        for i in range(1,number_of_seats+1):
            seats.append(Seat(bus=bus, number=i, price=1200))
        Seat.objects.bulk_create(seats)
        print(seats[0].id)

class BusDetail(generics.RetrieveAPIView):
    serializer_class=DetailBusSerializer
    queryset=Bus.objects.all()
    lookup_field='pk'

class BookingTickets(APIView):
    def post(self,request):
        payload=request.data
        seat_ids=[p['seat_id'] for p in payload.get('passengers',[])]
        bus_id=payload.get('bus_id')
        print(payload)
        
        seats_qs = Seat.objects.select_for_update().filter(id__in=seat_ids)
        if seats_qs.count() != len(seat_ids):
            return Response({"detail": "Invalid seat selection"}, status=400)

        with transaction.atomic():
            seats=list(seats_qs)
            already_booked=[s.id for s in seats if s.is_booked]

            if already_booked:
                return Response({"detail": "Seats already booked", "seats": already_booked}, status=409)
            
            # Compute total from seat prices
            total_amount = sum([s.price for s in seats])
            phone=payload['contact']['phone_number']
            email=payload['contact']['email']
            booking=BookingDetail.objects.create(phone_number=phone,email=email,total_amount=total_amount,bus_id=bus_id)

            # Create passenger records
            for p in payload['passengers']:
                name=p['name']
                age=int(p['age'])
                seat=next(s for s in seats if s.id==p['seat_id'])
                Passenger.objects.create(booking=booking,name=name,age=age,seat=seat)
                seat.is_booked=True
                seat.save(update_fields=['is_booked'])
            
            return Response({"booking_id": booking.id, "message": "Booking successful"}, status=201)
