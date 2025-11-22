from rest_framework import serializers
from account.models import Account
from bus.models import Seat,Bus
from rest_framework.exceptions import ValidationError


class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(min_length=8, write_only=True,error_messages={
        'min_length':'password must be atleast 8 character long!'
    })
    confirm_password=serializers.CharField(min_length=8,write_only=True)
    class Meta:
        model=Account
        fields=['first_name','last_name','email','password', 'confirm_password']

    def validate(self, data):
        if data['password']!=data['confirm_password']:
            raise ValidationError({"confirm_password":"your passwords does not match"})
        return data

    def create(self, data):
        user=Account.objects.create_user(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=data['password'])
        return user
    

class SeatBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seat
        fields=['pk']
    
    def update(self, instance, data):
        if instance.is_booked==True:
            raise ValidationError({"id":"the seat you have selected is already booked!"})
        else:
            instance.is_booked=True
            instance.save()
        return instance


class CreateBusSerializer(serializers.ModelSerializer):
    available_seats = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Bus
        fields=['id','name','number_plate','origin','destination','start_time','reach_time','number_of_seats', 'has_ac','has_chargingport','has_wifi','min_price', 'available_seats']

    def get_available_seats(self, obj):
        return Seat.objects.filter(bus=obj, is_booked=False).count()


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['id', 'number', 'price', 'is_booked']

class DetailBusSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, read_only=True)
    class Meta:
        model = Bus
        fields = ['id', 'name', 'number_plate', 'origin', 'destination', 'start_time', 'reach_time', 'number_of_seats', 'has_ac', 'has_chargingport', 'has_wifi', 'min_price', 'seats']



    
