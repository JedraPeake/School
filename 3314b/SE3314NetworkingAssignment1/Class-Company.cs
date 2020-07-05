using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE3314NetworkingAssignment1
{
    public class Class_Company
    {
        //private class variables, for the company class
        private String companyName;
        private String companySymbol;
        private Double openPrice;
        private Double lastSale;
        private Double volume;
        private Double netChange;
        private Image icon;
        private Double percentChange;

        //public lists, which store a companys buy orders, sellorders, and transactions
        public List<Class_BuyOrder> buyOrdersList = new List<Class_BuyOrder>();
        public List<Class_SellOrder> sellOrdersList = new List<Class_SellOrder>();
        public List<Class_Order> transactionsList = new List<Class_Order>();

        //constructor for the class, which allocates values or defines them
        public Class_Company(String name, String symbol, Double open)
        {
            this.companyName = name;
            this.companySymbol = symbol;
            this.openPrice = open;
            this.volume = 0.0;
            this.lastSale = 0.0;
            this.netChange = 0.0;
            this.icon = new Bitmap(@"C:\Users\PeakeAndSons\Desktop\test\SE3314NetworkingAssignment1\Resources\noChange.bmp", true);
            this.percentChange = 0.0;
        }

        /*  Getter's and Setter's for private variables!    */
        //getter and setter of the company name
        public String getCompanyName()
        {
            return this.companyName;
        }

        public void setCompanyName(String companyName)
        {
            this.companyName = companyName;
        }

        //getter and setter of the company symbol
        public String getCompanySymbol()
        {
            return this.companySymbol;
        }

        public void setCompanySymbol(String companySymbol)
        {
            this.companySymbol = companySymbol;
        }

        //getter and setter of the company open price
        public Double getOpenPrice()
        {
            return this.openPrice;
        }

        public void setOpenPrice(Double openPrice)
        {
            this.openPrice = openPrice;
        }

        //getter and setter of the last sale price
        public Double getLastSale() {
            return this.lastSale;
        }

        public void setLastSale(Double lastSale)
        {
            this.lastSale = lastSale;
        }

        //getter and setter of the volume
        public Double getVolume()
        {
            return this.volume;
        }

        public void setVolume(Double volume)
        {
            this.volume = volume;
        }

        //getter and setter of the the net change
        public Double getNetChange()
        {
            return this.netChange;
        }

        public void setNetChange(Double netChange)
        {
            this.netChange = netChange;
        }

        //getter and setter of the company icon
        public Image getIcon()
        {
            return this.icon;
        }

        public void setIcon(Image icon)
        {
            this.icon = icon;
        }

        //getter and setter of the percentage change
        public Double getpercentChange()
        {
            return this.percentChange;
        }

        public void setpercentChange(Double percentChange)
        {
            this.percentChange = percentChange;
        }

        /*  HELPER METHODS FOR UPDATING COMPANY VARIABLES   */

        //updating company variables, through helpers
        public void UpdateCompanyHelper(Class_Order order)
        {
            setNetChangeHelper(order.getPrice());
            setPercentChangeHelper();
            setLastSale(order.getPrice());
            setIconHelper();
        }

        //setter for the current percantage change that works out the current percantage change using the netchange and openprice
        public void setPercentChangeHelper()
        {
            this.percentChange = Math.Round((this.netChange / this.openPrice * 100), 2);
        }

        //setter for the current netpercantage change that works out the current netpercantage change using the openprice and orderprice
        public void setNetChangeHelper(Double orderPrice)
        {
            this.netChange = Math.Abs(openPrice - orderPrice);
        }

        //setter for current icon that works out the correct icon to display due to the lastSale price and open price
        public void setIconHelper()
        {
            if (this.openPrice < this.lastSale)
                this.icon = new Bitmap(@"C:\Users\PeakeAndSons\Desktop\test\SE3314NetworkingAssignment1\Resources\up.bmp", true);
            else if (this.openPrice > this.lastSale)
                this.icon = new Bitmap(@"C:\Users\PeakeAndSons\Desktop\test\SE3314NetworkingAssignment1\Resources\down.bmp", true);
            else
                this.icon = new Bitmap(@"C:\Users\PeakeAndSons\Desktop\test\SE3314NetworkingAssignment1\Resources\noChange.bmp", true);

        }

        /*  BUY ORDER LIST RELATED METHODS   */

        //add a new buy order to the buy order list
        public void addBuyOrder(Class_BuyOrder order)
        {
            buyOrdersList.Add(order);
            buyOrdersList = buyOrdersList.OrderByDescending(x => x.getPrice()).ToList();

            buyTransactionCheck(order);
        }

        /*  getters for buy order list  */
        //get buy order object by index
        public Class_BuyOrder getBuyOrder(int index)
        {
            return buyOrdersList[index];
        }
        //get buy order list size
        public int getBuyOrderSize()
        {
            return buyOrdersList.Count;
        }

        //get the buy order list, list
        public List<Class_BuyOrder> getBuyOrders()
        {
            return buyOrdersList;
        }

        //check for potential buyers that can complete open sell orders when creating a new buy order 
        public void buyTransactionCheck(Class_BuyOrder order) {
            foreach (Class_Order o in sellOrdersList)
            {
                //if there is a price in sell orders less than or equal to the buying price then a transcation can occur
                if (o.getPrice() <= order.getPrice())
                {
                    //if the sell order has more shares than the current buy order
                    if (o.getOrderSize() > order.getOrderSize())
                    {
                        //add order shares to the current share volume, set new sell order size by minusing the buyer size, and update company variables for the stock state summary
                        this.volume += order.getOrderSize();
                        o.setOrderSize(o.getOrderSize() - order.getOrderSize());
                        UpdateCompanyHelper(order);//o);


                        //add buy order to the transaction list no more shares left on buy order so break
                        transactionsList.Add(order);
                        break;
                    }

                    //if the buy order has more shares than the current sell order
                    else if (o.getOrderSize() < order.getOrderSize())
                    {
                        //add order shares to the current share volume, set new buy order size by minus the seller size, and update company variables for the stock state summary
                        this.volume += o.getOrderSize();
                        order.setOrderSize(order.getOrderSize() - o.getOrderSize());
                        UpdateCompanyHelper(order);

                        //add sell order to the transaction list and keeping searching still shares to buy
                        transactionsList.Add(o);
                        
                    }

                    //if the buy order and sell order have matching share sizes
                    else
                    {
                        //add order shares to the current share volume, and update company variables for the stock state summary
                        this.volume += order.getOrderSize();
                        UpdateCompanyHelper(order);

                        //add both buy order and sell order to the transaction list no more shares left on buy order so break
                        transactionsList.Add(o);
                        transactionsList.Add(order);
                        break; //exit loop
                    }

                }
            }

            //removing the current pending orders since they have now got a match
            foreach (Class_Order temp in transactionsList)
            {
                Class_SellOrder dummy = new Class_SellOrder();
                if (temp.GetType().Equals(dummy.GetType()))
                {
                    sellOrdersList.Remove((Class_SellOrder)temp);
                }
                else
                {
                    buyOrdersList.Remove((Class_BuyOrder)temp);
                }
            }
            
        }

        /*  SELL ORDER LIST RELATED METHODS   */

        //add a new sell order to the sell order list
        public void addSellOrder(Class_SellOrder order)
        {
            sellOrdersList.Add(order); //add sell order
            sellOrdersList = sellOrdersList.OrderBy(x => x.getPrice()).ToList();

            sellTransactionCheck(order);
        }

        /*  getters for sell order list  */
        //get sell order object by index
        public Class_SellOrder getSellOrder(int index)
        {
            return sellOrdersList[index];
        }
        //get sell order list size
        public int getSellOrderSize()
        {
            return sellOrdersList.Count;
        }

        //get the sell order list, list
        public List<Class_SellOrder> getSellOrders()
        {
            return sellOrdersList;
        }

        //check if we can complete any open buy orders when creating a new sell order 
        public void sellTransactionCheck(Class_SellOrder order) {
            foreach (Class_Order o in buyOrdersList)
            {
                //if there is a price in buy orders greater than or equal to the selling price then a transcation can occur
                if (o.getPrice() >= order.getPrice())
                {
                    //if the buy order has more shares than the sell order
                    if (o.getOrderSize() > order.getOrderSize())
                    {
                        //add order shares to the current share volume, set new buy order size by minusing the seller size, and update company variables for the stock state summary
                        this.volume += order.getOrderSize();
                        o.setOrderSize(o.getOrderSize() - order.getOrderSize());
                        UpdateCompanyHelper(order);

                        //add sell order to the transaction list no more shares left on sell order so break
                        transactionsList.Add(order);
                        break;
                    }

                    //if the sell order has more shares than the buy order
                    else if (o.getOrderSize() < order.getOrderSize())
                    {
                        //add order shares to the current share volume, set new sell order size by minus the buy order size, and update company variables for the stock state summary
                        this.volume += o.getOrderSize();
                        order.setOrderSize(order.getOrderSize() - o.getOrderSize());
                        UpdateCompanyHelper(o);

                        //add buy order to the transaction list and keeping searching still shares to buy
                        transactionsList.Add(o);
                    }

                    //if the buy order and sell order have matching share sizes
                    else
                    {
                        //add order shares to the current share volume, and update company variables for the stock state summary
                        this.volume += order.getOrderSize();
                        UpdateCompanyHelper(order);

                        //add both buy order and sell order to the transaction list no more shares left on sell order so break
                        transactionsList.Add(o);
                        transactionsList.Add(order);
                        break;
                    }

                }
            }

            //removing the current pending orders since they have now got a match
            foreach (Class_Order temp in transactionsList)
            {
                Class_SellOrder dummy = new Class_SellOrder();
                if (temp.GetType().Equals(dummy.GetType()))
                    sellOrdersList.Remove((Class_SellOrder)temp);
                else
                    buyOrdersList.Remove((Class_BuyOrder)temp);
            }
        }
        
    }
}
