

export default function getDateFromTimestamp(timestamp) {
    // Verificar si el timestamp es un número
    if (typeof timestamp !== 'number') {
      throw new Error('El timestamp debe ser un número');
    }
   
    let dateObj = new Date(timestamp);
   
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1; // Los meses en JavaScript empiezan desde 0
    let day = dateObj.getDate();
   
    return `${year}-${month}-${day}`;
   }
   