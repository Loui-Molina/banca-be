import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {ConsortiumService} from "@src/modules/consortiums/consortium.service";
import {Consortium} from "@database/datamodels/schemas/Consortium";
import {ConsortiumDto} from "@src/modules/consortiums/dtos/consortium.dto";

@ApiTags('consortiums')
@Controller('consortiums')
@UseGuards(AuthGuard())
export class ConsortiumController {
  constructor(private readonly consortiumService: ConsortiumService) {}

  @Get()
  @ApiFoundResponse({
    description: 'The records has been successfully founded.',
    type: Consortium,
  })
  getAll(): Promise<Array<Consortium>> {
    return this.consortiumService.getAll();
  }

  @Get('search')
  @ApiFoundResponse({
    description: 'The records has been successfully founded.',
    type: Consortium,
  })
  getFiltered(@Query('q') q: string, @Query('value') value: string): Promise<Array<Consortium>> {
    return this.consortiumService.getFiltered(q, value);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Consortium,
  })
  create(@Body() dto: ConsortiumDto): Promise<Consortium> {
    return this.consortiumService.create(dto);
  }

  @Put()
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: Consortium,
  })
  update(@Body() dto: ConsortiumDto): Promise<Consortium> {
    return this.consortiumService.update(dto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: Consortium,
  })
  delete(@Param('id') id: string): Promise<Consortium> {
    return this.consortiumService.delete(id);
  }

  @Get(':id')
  @ApiFoundResponse({
    description: 'The record has been successfully founded.',
    type: Consortium,
  })
  async get(@Param('id') id: string): Promise<Consortium> {
    return await this.consortiumService.get(id);
  }
}
