"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var configs_1 = __importDefault(require("configs"));
var SWAGGER_DEFINITION = {
    openapi: '3.0.0',
    info: {
        title: 'Piggies API documentation',
        version: '0.0.1',
        description: 'This is a personal finance management tool'
    },
    servers: [
        {
            url: "http://localhost:".concat(configs_1.default.port, "/v1"),
            description: 'Development Server'
        }
    ],
    components: {
        schemas: {
            Error: {
                type: 'object',
                properties: {
                    code: {
                        type: 'string'
                    },
                    message: {
                        type: 'string'
                    }
                }
            },
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string'
                    },
                    email: {
                        type: 'string',
                        format: 'email'
                    },
                    name: {
                        type: 'string'
                    },
                    role: {
                        type: 'string',
                        enum: ['user', 'admin']
                    }
                },
                example: {
                    id: '5ebac534954b54139806c112',
                    email: 'fake@example.com',
                    name: 'fake name',
                    role: 'user'
                }
            }
        },
        responses: {
            Forbidden: {
                description: 'Forbidden',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error'
                        },
                        example: {
                            code: 403,
                            message: 'Forbidden'
                        }
                    }
                }
            },
            NotFound: {
                description: 'Not found',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error'
                        },
                        example: {
                            code: 404,
                            message: 'Not found'
                        }
                    }
                }
            },
            Unauthorized: {
                description: 'Unauthorized',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error'
                        },
                        example: {
                            code: 401,
                            message: 'Please authenticate'
                        }
                    }
                }
            }
        }
    }
};
exports.default = SWAGGER_DEFINITION;
//# sourceMappingURL=index.js.map