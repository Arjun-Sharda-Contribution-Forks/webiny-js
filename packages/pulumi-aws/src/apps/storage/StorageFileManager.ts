import * as aws from "@pulumi/aws";
import { PulumiApp } from "@webiny/pulumi-sdk";

export function createFileManagerBucket(app: PulumiApp, params: { protect: boolean }) {
    return app.addResource(aws.s3.Bucket, {
        name: "fm-bucket",
        config: {
            acl: "private",
            // We definitely don't want to force-destroy if "protected" flag is true.
            forceDestroy: !params.protect,
            corsRules: [
                {
                    allowedHeaders: ["*"],
                    allowedMethods: ["POST", "GET"],
                    allowedOrigins: ["*"],
                    maxAgeSeconds: 3000
                }
            ]
        },
        opts: {
            protect: params.protect
        }
    });
}
