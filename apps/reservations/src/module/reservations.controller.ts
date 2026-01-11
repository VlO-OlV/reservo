import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() data: CreateReservationDto) {
    return this.reservationsService.create({ ...data, userId: '123' });
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateReservationDto) {
    return this.reservationsService.updateById(id, { ...data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.deletById(id);
  }
}
