import { StudentWorkCodec } from "TPEngine@2026/infrastructure/codecs/StudentWork";
import { createBrowserFileStore, createIndexDBStore } from "TPEngine@2026/infrastructure/stores/DataStore";

export function getLocalStudentWorkStore() {
    return createIndexDBStore("StudentWork", StudentWorkCodec);
}

export function getExternalStudentWorkStore() {
    return createBrowserFileStore(StudentWorkCodec);
}