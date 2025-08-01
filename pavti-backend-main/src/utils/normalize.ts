export function normalizeContactNo(input: string): string {
    let digits = input.replace(/\D/g, "");
  
    if (digits.startsWith("00")) digits = digits.slice(2);
    else if (digits.startsWith("0")) digits = digits.slice(1);
  
    if (digits.length === 10) {
      digits = "91" + digits;
    }
  
    return digits;
  }
  