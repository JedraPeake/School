using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SE3314NetworkingAssignment1
{
    public partial class StockStateSummaryForm : Form, Class_StockMarketDisplay
    {
        private Class_RealTimeData realTimeData;

        public StockStateSummaryForm()
        {
            InitializeComponent();
        }
        //initialize form and realTimedata
        public StockStateSummaryForm(Class_RealTimeData realTimeData)
        {
            InitializeComponent();
            this.realTimeData = realTimeData;
        }

        //called on load, update called here to dynamicaly populate each company into the datagrid
        private void StockStateSummaryForm_Load(object sender, EventArgs e)
        {
            realTimeData.Register(this);
            Update(realTimeData);

        }

        //called by observers, this method will iterate over each company and add its information using getters to the datagrid
        //each row will contain -> comapnyName, symbol, openPrice, lastSalePrice, NetChange, currentIcon, percentageChange, volume of shares
        public void Update(Class_RealTimeData subject)
        {
            dataGridView1.Rows.Clear();
            
            foreach (Class_Company currCompany in realTimeData.CompanyList)
            {
                dataGridView1.Rows.Add(currCompany.getCompanyName(), currCompany.getCompanySymbol(), currCompany.getOpenPrice(), currCompany.getLastSale(), currCompany.getNetChange(), currCompany.getIcon(), currCompany.getpercentChange(), currCompany.getVolume());
            }
            
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }

}

