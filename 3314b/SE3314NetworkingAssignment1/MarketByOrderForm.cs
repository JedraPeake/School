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
    public partial class MarketByOrderForm : Form, Class_StockMarketDisplay
    {
        private Class_Company currCompany;

        //initialize form and company
        public MarketByOrderForm(Class_Company currCompany)
        {
            InitializeComponent();
            this.currCompany = currCompany;
        }

        //update method from the observer, to update datagrid with realtimedata
        public void Update(Class_RealTimeData subject)
        {
            dataGridView1.Rows.Clear();
            
            //workout max possible length using buyordersize and sellordersize 
            int size;
            if (currCompany.getSellOrderSize() > currCompany.getBuyOrderSize())
            {
                size = currCompany.getSellOrderSize();
            }
            else
            {
                size = currCompany.getBuyOrderSize();
            }
            
            //for loop to add data to each row of the datagrid
            for (int i = 0; i < size; i++)
            {
                //if a row contains seller order only ie: more sellers than buyers so first 2 rows are blank at some point
                if (i >= currCompany.getBuyOrderSize())
                {
                    dataGridView1.Rows.Add("", "", currCompany.getSellOrder(i).getPrice(), currCompany.getSellOrder(i).getOrderSize());

                }

                //if a row contains buyer order only ie: more buyers than selles so first 2 rows are blank at some point
                else if (i >= currCompany.getSellOrderSize())
                {
                    dataGridView1.Rows.Add(currCompany.getBuyOrder(i).getOrderSize(), currCompany.getBuyOrder(i).getPrice());
                }

                //else called on rows that contain both buyers and sellers
                else
                {
                    dataGridView1.Rows.Add(currCompany.getBuyOrder(i).getOrderSize(), currCompany.getBuyOrder(i).getPrice(), currCompany.getSellOrder(i).getPrice(), currCompany.getSellOrder(i).getOrderSize());
                }

                //limit of the top 10 so break out of the for loop
                if (i == 9)
                {
                    break;
                }

            }
            
        }

        private void MarketByOrderForm_Load(object sender, EventArgs e)
        {

        }
    }
}
