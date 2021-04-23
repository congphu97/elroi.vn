
import { Module } from '@nestjs/common';
import { BackgroundController } from './background.controller';
import { BackgroundService } from './background.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Background } from './background.model';


@Module({
    imports: [TypegooseModule.forFeature([Background]),
    ],
    providers: [BackgroundService],
    controllers: [BackgroundController]
})
export class BackgroundModule { }