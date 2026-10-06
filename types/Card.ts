import React from "react";

export type CardProps = {
    label: string;
    value: number | string;
    icon?: React.ReactNode;
    description?: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
};