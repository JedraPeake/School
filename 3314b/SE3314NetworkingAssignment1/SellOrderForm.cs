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
    public partial class SellOrderForm : Form
    {
        private Class_RealTimeData realTimeData;

        //initialize form and realTimedata
        public SellOrderForm(Class_RealTimeData realTimeData)
        {
            InitializeComponent();
            this.realTimeData = realTimeData;
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        //cancel pressed close form
        private void button2_Click(object sender, EventArgs e)
        {
            base.Close();
        }

        //submit button on the combobox click event
        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                int volume = Convert.ToInt32(textBox1.Text);
                double price = Convert.ToDouble(textBox2.Text);

                //make sure volume and price are 0 or greater
                if (volume <= 0 || price <= 0)
                {
                    throw new Exception();
                }

                //create new sellOrder, then add sell order to the respective companies sell orderlist 
                //using the combobox selected index
                Class_SellOrder order = new Class_SellOrder(price, volume);
                realTimeData.CompanyList[comboBox1.SelectedIndex].addSellOrder(order);

                //notify observes
                realTimeData.Notify();

                //clear textbox's for the next user sell input
                textBox1.Clear();
                textBox2.Clear();
            }
            catch
            {
                //Show an invalid error message if user entered inputs are invalid
                MessageBox.Show("You have entered an invalid value ", "Invalid Input");
            }
        }

        //function called on form load which will populate all the companies into the comboBox
        //afterwards select the first company as the default for the combobox
        private void SellOrderForm_Load(object sender, EventArgs e)
        {
            foreach (Class_Company c in this.realTimeData.CompanyList)
            {
                this.comboBox1.Items.Add(c.getCompanyName());
            }

            this.comboBox1.SelectedIndex = 0;
        }
    }
}
