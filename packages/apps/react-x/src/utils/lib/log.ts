import { BaseTrack, UserTrackData } from "./track";

const bt = new BaseTrack();

export function sendLog<T>(data: T) {
    bt.track(data as (T & UserTrackData))
}