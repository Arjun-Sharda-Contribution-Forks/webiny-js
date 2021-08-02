import React from "react";
import styled from "@emotion/styled";
import { UIRenderer, UIRenderParams } from "@webiny/ui-composer/UIRenderer";
import { FormElementMessage } from "@webiny/ui/FormElementMessage";
import { FileManagerElement } from "~/elements/form/FileManagerElement";
import { FileManager } from "~/components";
import { FormFieldElementRenderProps } from "~/elements/form/FormFieldElement";

const ImageUploadWrapper = styled("div")({
    position: "relative",
    ".disabled": {
        opacity: 0.75,
        pointerEvents: "none"
    },
    ".mdc-floating-label--float-above": {
        transform: "scale(0.75)",
        top: 10,
        left: 10,
        color: "var(--mdc-theme-text-secondary-on-background)"
    },
    ".mdc-text-field-helper-text": {
        color: "var(--mdc-theme-text-secondary-on-background)"
    }
});

export interface FileManagerElementRenderProps extends FormFieldElementRenderProps {
    fileManagerElement: FileManagerElement;
    value: any;
    showFileManager: () => void;
    onChange: (value: any) => void;
}

export class FileManagerElementRenderer extends UIRenderer<
    FileManagerElement,
    FormFieldElementRenderProps
> {
    render({
        element,
        props
    }: UIRenderParams<FileManagerElement, FormFieldElementRenderProps>): React.ReactNode {
        if (!props.formProps) {
            throw Error(`FileManagerElement must be placed inside of a FormElement.`);
        }

        const { Bind } = props.formProps;

        const accept = element.getAccept();
        const label = element.getLabel();
        const description = element.getDescription();

        return (
            <Bind
                name={element.getName()}
                validators={element.getValidators()}
                defaultValue={element.getDefaultValue()}
                beforeChange={(value, cb) => element.onBeforeChange(value, cb)}
                afterChange={(value, form) => element.onAfterChange(value, form)}
            >
                {({ value, onChange, validation }) => (
                    <ImageUploadWrapper>
                        {label && (
                            <div className="mdc-floating-label mdc-floating-label--float-above">
                                {label}
                            </div>
                        )}

                        <FileManager
                            onChange={onChange}
                            onChangePick={element.getOnChangePickAttributes()}
                            accept={accept}
                            images={!accept}
                            maxSize={element.getMaxSize()}
                            multipleMaxCount={element.getMultipleMaxCount()}
                            multipleMaxSize={element.getMultipleMaxSize()}
                        >
                            {({ showFileManager }) =>
                                element.getEmptyStateElement().render({
                                    ...props,
                                    fileManagerElement: element,
                                    showFileManager,
                                    value,
                                    onChange
                                })
                            }
                        </FileManager>

                        {validation.isValid === false && (
                            <FormElementMessage error>{validation.message}</FormElementMessage>
                        )}
                        {validation.isValid !== false && description && (
                            <FormElementMessage>{description}</FormElementMessage>
                        )}
                    </ImageUploadWrapper>
                )}
            </Bind>
        );
    }
}