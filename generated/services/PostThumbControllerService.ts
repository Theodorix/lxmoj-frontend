/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { PostThumbAddRequest } from '../models/PostThumbAddRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostThumbControllerService {

    /**
     * doPostThumb
     * @param postThumbAddRequest postThumbAddRequest
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doPostThumbUsingPost(
postThumbAddRequest: PostThumbAddRequest,
): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_thumb/',
            body: postThumbAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getPost_thumbStatus
     * @param postId postId
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static getPostThumbStatusUsingGet(
postId?: number,
): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/post_thumb/get/post_thumb/status',
            query: {
                'postId': postId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
