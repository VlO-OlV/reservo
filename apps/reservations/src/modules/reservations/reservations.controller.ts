import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser, JwtGuard, UserDto } from '@app/common';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @CurrentUser() user: UserDto,
    @Body() data: CreateReservationDto,
  ) {
    return this.reservationsService.create(data, user);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateReservationDto) {
    return this.reservationsService.updateById(id, { ...data });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationsService.deletById(id);
  }
}
