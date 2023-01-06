import { Controller, Get, Inject, Req, Res, Next, Post } from '@nestjs/common';
import { HttpRequestHandler, PostGraphileResponseNode } from 'postgraphile';
import { Request, Response } from 'express';
@Controller('')
export class UserController {
    constructor(
        @Inject("POSTGINIT")
        private readonly postgraphileMiddleware: HttpRequestHandler) { }
    @Get('/use/graphiql')
    async graphiql(@Req() request: Request, @Res() response: Response, @Next() next) {
        await this.postgraphileMiddleware.graphiqlRouteHandler(new PostGraphileResponseNode(request, response, next));
    }

    @Post('/use/graphql')
    async graphql(@Req() request: Request, @Res() response: Response, @Next() next) {
        await this.postgraphileMiddleware.graphqlRouteHandler(new PostGraphileResponseNode(request, response, next));
    }
}