import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Background } from './background.model';
import { BackgroundService } from './background.service';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import * as path from 'path';
import { diskStorage } from 'multer';

@Controller('background')
export class BackgroundController {
    constructor(private backgroundService: BackgroundService) { }

    @Get('/:id')
    async getOneBackground(@Res() res, @Param('id') id): Promise<Background[] | null> {
        const backgrounds = await this.backgroundService.getOneBackground(id);
        return res.status(HttpStatus.OK).json(backgrounds);
    }

    @Post()
    async createBackground(@Res() res, @Body() background: Background): Promise<Background> {
        const newBackground = await this.backgroundService.createBackground(background);
        if (!newBackground) throw new NotFoundException('Create fail');
        return res.status(HttpStatus.OK).json(newBackground);
    }

    @Put('/:id')
    async updateBackground(@Res() res, @Body() background: Background, @Param('id') id): Promise<Background> {
        const newBackground = await this.backgroundService.updateBackground(id, background);
        if (!newBackground) throw new NotFoundException('Update fail');
        return res.status(HttpStatus.OK).json(newBackground);
    }


    @Delete('/:id')
    async deleteBackground(@Res() res, @Param('id') id): Promise<Background> {
        const newBackground = await this.backgroundService.deleteBackground(id);
        if (!newBackground) throw new NotFoundException('Update fail');
        return res.status(HttpStatus.OK).json(newBackground);
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files[]', 20,
        {
            storage: diskStorage({
                destination: './uploads/',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter
        }))
    async logFiles(@UploadedFiles() images, @Body() fileDto: any, @Res() res) {
        return res.send(images);

    }


    @Get()
    async listBackgrounds(@Query() query, @Res() res): Promise<Background[] | null> {
        const Backgrounds = await this.backgroundService.getBackground(query);
        console.log('59',Backgrounds,    query)
        return res.status(HttpStatus.OK).json(Backgrounds);
    }

    @Get('/img/:imgpath')
    async seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './uploads' });
    }
}