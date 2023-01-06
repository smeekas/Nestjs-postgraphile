import postgraphile, { Build, ExtensionDefinition, gql } from "postgraphile";
import { makeExtendSchemaPlugin, Resolvers, makeWrapResolversPlugin } from 'graphile-utils'
import simply from '@graphile-contrib/pg-simplify-inflector';

// type hell=(build:Build)=>{typeDefs:}
const plug = makeExtendSchemaPlugin((build: Build): ExtensionDefinition => {
    // console.log(build.graphql.)

    return {
        typeDefs: gql`
       
        extend type User{
            income:Int
        }
        `, resolvers: {
            User: {
                income: async (source) => {
                    console.log('----------source----------')
                    console.log(source)
                    return await 2000
                }
            }
        }
    }
})
const reso = makeWrapResolversPlugin({
    User: {
        async emailAddress(resolve, source, args, context, resolverInfo) {
            const result = await resolve(source, args, context, resolverInfo) ;
            console.log('----------reso----------')
            console.log(resolverInfo.returnType    )
            return result+" email is here" 
        }
    }
})
const postgraphileProvider = {
    provide: "POSTGINIT",
    useFactory: () => {
        return postgraphile(
            "postgres://postgres:adminadmin@172.16.6.241:5432/mydb", "public", {
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
            allowExplain: true,
            appendPlugins: [simply, plug, reso],
            graphiqlRoute: "/use/graphiql",
            graphqlRoute: "/use/graphql",

        }
        )
    }
}

export { postgraphileProvider }