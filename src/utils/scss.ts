/**
 * Util class for all SCSS operations.
 */
export class Scss {

    /**
     * Add shared index into specified SCSS content.
     *
     * @param content The SCSS content to modify
     * @return The new SCSS content
     */
    static ensureUseIndex(content: string): string {
        const line = `@use 'index' as *;`;
        return content.includes(line)
            ? content
            : `${line}\n${content}`;
    }

}
