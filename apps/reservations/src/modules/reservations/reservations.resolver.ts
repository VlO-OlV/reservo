import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ReservationEntity } from "./models/reservation.entity";
import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { CurrentUser, UserDto } from "@app/common";

@Resolver(() => ReservationEntity)
export class ReservationsResolver {
  public constructor(
    private readonly reservationsService: ReservationsService,
  ) {}

  @Mutation(() => ReservationEntity)
  public async createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.reservationsService.create(createReservationInput, user);
  }

  @Query(() => [ReservationEntity], { name: 'reservations' })
  public async findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => ReservationEntity, { name: 'reservation' })
  public async findOne(
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.reservationsService.findById(id);
  }

  @Mutation(() => ReservationEntity)
  public async deleteReservation(
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.reservationsService.deletById(id);
  }
}