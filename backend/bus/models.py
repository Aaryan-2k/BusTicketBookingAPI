from django.db import models

class Bus(models.Model):
    name=models.CharField(max_length=250)
    number_plate=models.CharField(max_length=100, unique=True)
    origin=models.CharField(max_length=250)
    destination=models.CharField(max_length=250)
    start_time=models.DateTimeField()
    reach_time=models.DateTimeField()
    number_of_seats=models.PositiveIntegerField()
    has_ac=models.BooleanField(default=False)
    has_chargingport=models.BooleanField(default=False)
    has_wifi=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    min_price=models.FloatField()

    def __str__(self):
        return self.name

class Seat(models.Model):
    bus=models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='seats')
    number=models.CharField(max_length=10)
    price=models.FloatField()
    is_booked=models.BooleanField(default=False)

class BookingDetail(models.Model):
    phone_number=models.CharField(max_length=20)
    email=models.EmailField()
    bus=models.ForeignKey(Bus,on_delete=models.CASCADE)
    total_amount=models.FloatField()

class Passenger(models.Model):
    booking=models.ForeignKey(BookingDetail,on_delete=models.CASCADE)
    name=models.CharField(max_length=250)
    age=models.PositiveIntegerField()
    seat=models.OneToOneField(Seat,on_delete=models.CASCADE)
    
