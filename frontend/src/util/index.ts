export function shortName(name: string) {
    const nameParts = name.split(' ');

    return nameParts.length > 1
        ? `${nameParts[0]} ${(nameParts[1][0] as string).toUpperCase()}.`
        : nameParts[0];
}
