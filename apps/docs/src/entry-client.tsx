import { mount, StartClient } from "solid-start/entry-client";
import "@serenity-ui/core/dist/style.css";
import "./root.css";
import { defaultButtonProps } from "@serenity-ui/core";

defaultButtonProps.variant = "subtle"

mount(() => <StartClient />, document);