export const displayAFNCurrency = (num) =>{
    // This function is used to format the price according to the indian format
    const formatter = new Intl.NumberFormat('en-AF',{
        style: "currency",
        currency: 'AFN',
        minimumFractionDigits: 0
    });

    return formatter.format(num);
}