"use client"

import {createReactBlockSpec} from "@blocknote/react";
import {defaultProps} from "@blocknote/core";
import React from "react";
import AlertSelect from "@/components/blocks/alert-select";

export type AlertType = "warning" | "error" | "info" | "success";

export const Alert = createReactBlockSpec(
    {
        type: "alert",
        propSchema: {
            textAlignment: defaultProps.textAlignment,
            textColor: defaultProps.textColor,
            type: {
                default: "warning",
                values: ["warning", "error", "info", "success"]
            },
        },
        content: "inline"
    },
    {
        render: (props) => {
            return (
                <AlertSelect
                    onUpdate={(value) => {
                        props.editor.updateBlock(props.block, {
                            type: "alert",
                            props: {type: value || "warning"}
                        })
                    }}
                    currentType={props.block.props.type}
                >
                    <div className={"inline-content"} ref={props.contentRef}/>
                </AlertSelect>
            )
        },
    }
);
