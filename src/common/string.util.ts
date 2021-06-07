import * as randomstring from 'randomstring';

export class StringUtil {

    /**
     * Random string with provided length.
     *
     * @param len
     */
    public static randomString(len: number): string {
        return randomstring.generate(len);
    }
}
