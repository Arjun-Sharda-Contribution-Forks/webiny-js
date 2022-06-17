import { PulumiAppParam } from "@webiny/pulumi";
import { createCorePulumiApp, CoreAppLegacyConfig } from "@webiny/pulumi-aws";

export interface CreateCoreAppParams {
    /**
     * Secures against deleting database by accident.
     * By default enabled in production environments.
     */
    protect?: PulumiAppParam<boolean>;

    /**
     * Enables ElasticSearch infrastructure.
     * Note that it requires also changes in application code.
     */
    elasticSearch?: PulumiAppParam<boolean>;

    /**
     * Enables VPC for the application.
     * By default enabled in production environments.
     */
    vpc?: PulumiAppParam<boolean>;

    /**
     * Additional settings for backwards compatibility.
     */
    legacy?: PulumiAppParam<CoreAppLegacyConfig>;

    /**
     * Provides a way to adjust existing Pulumi code (cloud infrastructure resources)
     * or add additional ones into the mix.
     */
    pulumi?: (app: ReturnType<typeof createCorePulumiApp>) => void;
}

export function createCoreApp(projectAppParams: CreateCoreAppParams = {}) {
    return {
        id: "core",
        name: "Core",
        description: "Your project's stateful cloud infrastructure resources.",
        pulumi: createCorePulumiApp(projectAppParams)
    };
}
