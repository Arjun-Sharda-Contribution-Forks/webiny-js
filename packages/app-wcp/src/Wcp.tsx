import React, { useState } from "react";
import { WcpProvider as ContextProvider } from "./contexts";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const GET_WCP_PROJECT = gql`
    query GetWcpProject {
        wcp {
            getProject {
                data {
                    package {
                        features {
                            seats {
                                enabled
                                options
                            }
                            multiTenancy {
                                enabled
                            }
                            advancedPublishingWorkflow {
                                enabled
                            }
                        }
                    }
                }
                error {
                    message
                    code
                    data
                }
            }
        }
    }
`;

export const Wcp: React.FC = ({ children }) => {
    const [project, setProject] = useState();
    useQuery<GetWcpProjectGqlResponse>(GET_WCP_PROJECT, {
        skip: project,
        onCompleted: response => {
            const { data } = response.wcp.getProject;
            setProject(data);
        }
    });

    if (!project) {
        return null;
    }

    return <ContextProvider project={project}>{children}</ContextProvider>;
};
