export function reformatAbilityDesc(inputString: string) {
  return inputString.replace(/{{(.*?)}}/g, '?');
}