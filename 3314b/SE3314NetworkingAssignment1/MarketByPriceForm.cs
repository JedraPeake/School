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
    public partial class MarketByPriceForm : Form, Class_StockMarketDisplay
    {
        private Class_Company company;
        public MarketByPriceForm(Class_Company c)
        {
            InitializeComponent();
            this.company = c;
        }

        //update method from the observer, to update datagrid with realtimedata
        public void Update(Class_RealTimeData subject)
        {
            dataGridView1.Rows.Clear();

            //create a temporary set of buy and sell orders
            //group each by price, to join orders with the same price
            List<Class_BuyOrder> tmp = company.getBuyOrders();
            var grpBuyOrders = tmp.GroupBy(x => x.getPrice());
            List<Class_SellOrder> tmp2 = company.getSellOrders();
            var grpSellOrders = tmp2.GroupBy(x => x.getPrice());

            //workout max possible length using buyordersize and sellordersize 
            int size = 0;
            if (company.getBuyOrderSize() > company.getSellOrderSize())
            {
                size = company.getBuyOrderSize();
            }
            else
            {
                size = company.getSellOrderSize();
            }

            //for loop to add data to each row of the datagrid
            for (int i = 0; i < size; i++)
            {
                double buyVolume = 0;
                int buyCounter = 0;
                double buyPrice = 0;

                //workout out the volume, price and size of each order buy group
                if (i < grpBuyOrders.Count())
                {
                    buyPrice = grpBuyOrders.ElementAt(i).Key;
                    foreach (var value in grpBuyOrders.ElementAt(i))
                    {
                        buyVolume += value.getOrderSize();
                        buyCounter++;
                    }
                }

                double sellVolume = 0;
                int sellCounter = 0;
                double sellPrice = 0;

                //workout out the volume, price and size of each order sell group
                if (i < grpSellOrders.Count())
                {
                    sellPrice = grpSellOrders.ElementAt(i).Key;
                    foreach (var value in grpSellOrders.ElementAt(i))
                    {
                        sellVolume += value.getOrderSize();
                        sellCounter++;
                    }
                }

                //if a row contains seller order only ie: more sellers than buyers so first 3 rows are blank at some point
                if (i >= grpBuyOrders.Count())
                {
                    if (sellCounter > 0)
                    {
                        dataGridView1.Rows.Add("", "", "", sellPrice, sellVolume, sellCounter);
                    }
                }

                //if a row contains buyer order only ie: more buyers than selles so first 2 rows are blank at some point
                else if (i >= grpSellOrders.Count())
                {
                    if (buyCounter > 0)
                    {
                        dataGridView1.Rows.Add(buyCounter, buyVolume, buyPrice);
                    }
                }

                //if both buy and sell orders in row
                else
                {
                    if (buyCounter > 0 && sellCounter > 0)
                    {
                        dataGridView1.Rows.Add(buyCounter, buyVolume, buyPrice, sellPrice, sellVolume, sellCounter);
                    }
                }

                //limit of the top 10 so break out of the for loop
                if (i == 9)
                {
                    break;
                }
            }
           
        }
        

        private void MarketByPriceForm_Load(object sender, EventArgs e)
        {

        }
    }
}
