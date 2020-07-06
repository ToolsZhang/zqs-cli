import Controller from './controller';
import <%=modelUppercase%> from './model';

export default <%=modelUppercase%>.routes(
  '<%=endpoint%>',
  {
    path: '/',
    methods: ['get'],
    controller: Controller.index,
    tags: ['<%=modelUppercase%>'],
    summary: 'List <%=modelUppercasePlural%>',
    description: 'List <%=modelUppercasePlural%>',
    consumes: ['application/json', 'application/xml'],
    produces: ['application/json', 'application/xml'],
    parameters: [<%=modelUppercase%>.docSchema.paginateOptions, <%=modelUppercase%>.docSchema.filters],
    responses: {
      200: {
        description: 'Successful operation',
        schema: <%=modelUppercase%>.docSchema.paginateResult,
      },
      '4xx': <%=modelUppercase%>.docSchema.response4xx,
      '5xx': <%=modelUppercase%>.docSchema.response5xx,
    },
  },
  {
    path: '/',
    methods: ['post'],
    controller: Controller.create,
    tags: ['<%=modelUppercase%>'],
    summary: 'Create <%=article%> <%=modelUppercase%>',
    description: 'Create <%=article%> <%=modelUppercase%>',
    consumes: ['application/json', 'application/xml'],
    produces: ['application/json', 'application/xml'],
    parameters: [
      <%=modelUppercase%>.docSchema.bodyWithOptions({
        exclude: '__auth __v _id createdAt updatedAt',
      }),
    ],
    responses: {
      201: {
        description: 'Successful operation',
        schema: <%=modelUppercase%>.docSchema.result,
      },
      '4xx': <%=modelUppercase%>.docSchema.response4xx,
      '5xx': <%=modelUppercase%>.docSchema.response5xx,
    },
  },
  {
    path: '/:id',
    methods: ['get'],
    controller: Controller.show,
    tags: ['<%=modelUppercase%>'],
    summary: 'Retrieve <%=article%> <%=modelUppercase%>',
    description: 'Retrieve <%=article%> <%=modelUppercase%>',
    consumes: ['application/json', 'application/xml'],
    produces: ['application/json', 'application/xml'],
    parameters: [<%=modelUppercase%>.docSchema.showOptions, <%=modelUppercase%>.docSchema.paramId],
    responses: {
      200: {
        description: 'Successful operation',
        schema: <%=modelUppercase%>.docSchema.result,
      },
      '4xx': <%=modelUppercase%>.docSchema.response4xx,
      '5xx': <%=modelUppercase%>.docSchema.response5xx,
    },
  },
  {
    path: '/:id',
    methods: ['put', 'patch'],
    controller: Controller.update,
    tags: ['<%=modelUppercase%>'],
    summary: 'Modify <%=article%> <%=modelUppercase%>',
    description: 'Modify <%=article%> <%=modelUppercase%>',
    consumes: ['application/json', 'application/xml'],
    produces: ['application/json', 'application/xml'],
    parameters: [
      <%=modelUppercase%>.docSchema.paramId,
      <%=modelUppercase%>.docSchema.bodyWithOptions({
        exclude: '__auth __v _id createdAt updatedAt',
      }),
    ],
    responses: {
      200: {
        description: 'Successful operation',
        schema: <%=modelUppercase%>.docSchema.result,
      },
      '4xx': <%=modelUppercase%>.docSchema.response4xx,
      '5xx': <%=modelUppercase%>.docSchema.response5xx,
    },
  },
  {
    path: '/:id',
    methods: ['delete'],
    controller: Controller.destroy,
    tags: ['<%=modelUppercase%>'],
    summary: 'Delete <%=article%> <%=modelUppercase%>',
    description: 'Delete <%=article%> <%=modelUppercase%>',
    produces: ['text/plain'],
    parameters: [<%=modelUppercase%>.docSchema.paramId],
    responses: {
      204: {
        description: 'Successful operation',
      },
      '4xx': <%=modelUppercase%>.docSchema.response4xx,
      '5xx': <%=modelUppercase%>.docSchema.response5xx,
    },
  }
);
