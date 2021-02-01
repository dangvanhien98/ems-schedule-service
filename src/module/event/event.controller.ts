import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { EventService } from './event.service';

@Controller('event')
@UseGuards(AuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get()
  getAll(@Query() id: number, @Req() req: any) {
    const userId = req.user?.id;
    id = userId;
    return this.eventService.getEventList$(id);
  }
}
