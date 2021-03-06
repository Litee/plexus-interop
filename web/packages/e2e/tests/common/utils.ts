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

const globalObj: any = global || window;

export function readEncodedConfig(): any {
    const hashValue = window.location.hash.slice(1);
    return JSON.parse(decodeURIComponent(hashValue));
}

export function readWsUrl(): string {
    const args: string[] = readEncodedConfig().rawArgs;
    const wsUrl = args.filter(v => v.indexOf("ws://") !== -1)[0];
    return wsUrl;
}

export function readHostUrl(): string {
    // tslint:disable-next-line:no-string-literal
    if (globalObj["__karma__"]) {
        // tslint:disable-next-line:no-string-literal        
        return globalObj["__karma__"].config.hostPath;
    }
    const args: string[] = readEncodedConfig().rawArgs;
    const hostUrl = args.filter(v => v.indexOf("http://") !== -1)[0];
    return hostUrl;
}