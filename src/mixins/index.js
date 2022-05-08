import jsPDF from 'jspdf'
import 'jspdf-autotable'

const doc = new jsPDF()

// It can parse html:
// <table id="my-table"><!-- ... --></table>
doc.autoTable({ html: '#my-table' })

// Or use javascript directly:
doc.autoTable({
  head: [['Ürün Adı', 'Adet']],
  body: [
    ['David', 'david@example.com', 'Sweden'],
    ['Castille', 'castille@example.com', 'Spain'],
    // ...
  ], 
})

doc.save('table.pdf')
