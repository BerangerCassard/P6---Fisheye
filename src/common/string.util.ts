export class StringUtil {

    /**
     * Random string with provided length.
     *
     * @param len
     *
     *     public static randomString(len: number): string {
        return randomstring.generate(len);
    }
     */


    public static noHashAllLowCase(word: string) {
        return word.substring(1).toLocaleLowerCase()
    }

    public static empty() {
        return ''
    }
}
