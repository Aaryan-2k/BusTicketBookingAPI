from django.db import models


class Bus(models.Model):
    name=models.CharField(max_length=250)
    number_plate=models.CharField(max_length=100, unique=True)
    origin=models.CharField(max_length=250)
    destination=models.CharField(max_length=250)
    start_time=models.DateTimeField()
    reach_time=models.DateTimeField()
    number_of_seats=models.PositiveIntegerField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Seat(models.Model):
    bus=models.ForeignKey(Bus, on_delete=models.CASCADE)
    number=models.CharField(max_length=10)
    price=models.FloatField()
    is_booked=models.BooleanField(default=False)
