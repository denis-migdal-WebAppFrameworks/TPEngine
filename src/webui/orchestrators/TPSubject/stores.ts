import { StudentWorkCodec } from "TPEngine@2026/models/StudentWork/codec";
import { createBrowserFileStore, createIndexDBStore } from "TPEngine@2026/modules/@platform/dataIO/stores";

export function getLocalStudentWorkStore() {
    return createIndexDBStore("StudentWork", StudentWorkCodec);
}

export function getExternalStudentWorkStore() {
    return createBrowserFileStore(StudentWorkCodec);
}