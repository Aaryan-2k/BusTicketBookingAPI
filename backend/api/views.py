from django.shortcuts import render,get_object_or_404
from rest_framework import generics
from .serializers import RegisterSerializer,SeatBookingSerializer,CreateBusSerializer
from account.models import Account
from bus.models import Seat,Bus
from rest_framework.permissions import AllowAny,IsAuthenticated

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
        print(bus.id)
        number_of_seats=bus.number_of_seats
        seats=[]
        for i in range(1,number_of_seats+1):
            seats.append(Seat(bus=bus, number=i, price=1200))
        Seat.objects.bulk_create(seats)
        print(seats[0].id)