/**
 * Copyright 2017 Plexus Interop Deutsche Bank AG
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { StreamingInvocationClient } from "@plexus-interop/client";
import { Observer } from "@plexus-interop/common";
import { Marshaller } from "@plexus-interop/broker";

export type UnaryStringHandler = (requestJson: string) => Promise<string>;
export type ServerStreamingStringHandler = (request: string, invocationHostClient: StreamingInvocationClient<string>) => void;
export type BidiStreamingStringHandler = (invocationHostClient: StreamingInvocationClient<string>) => Observer<string>;

export function wrapGenericHostClient(base: StreamingInvocationClient<ArrayBuffer>, marshaller: Marshaller<any, ArrayBuffer>): StreamingInvocationClient<string> {
    return {
        complete: () => base.complete(),
        next: async v => base.next(marshaller.encode(JSON.parse(v))),
        error: e => base.error(e),
        cancel: () => base.cancel()
    };
}

export function toGenericObserver(base: Observer<string>, decoder: Marshaller<any, ArrayBuffer>): Observer<ArrayBuffer> {
    return {
        next: v => base.next(JSON.stringify(decoder.decode(v))),
        complete: () => base.complete(),
        error: e => base.error(e)
    };
}