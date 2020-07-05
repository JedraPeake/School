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
    public partial class StockSecuritiesExchange : Form
    {
        private Class_RealTimeData realTimeData;

        //initialize form and realTimedata
        public StockSecuritiesExchange()
        {
            InitializeComponent();
            realTimeData = new Class_RealTimeData();
        }

        private void windowsToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        //method called when begin trading is clicked in the menu
        private void beginTradingToolStripMenuItem_Click(object sender, EventArgs e)
        {
            //disable begin item, and enable stop trading
            stopTradingToolStripMenuItem.Enabled = true;
            beginTradingToolStripMenuItem.Enabled = false;

            //change text from <<closed>> to <<open>>
            marketToolStripMenuItem.Text = "Market <<Open>>";

            //show orders and watch menu items
            watchToolStripMenuItem.Visible = true;
            ordersToolStripMenuItem.Visible = true;
        }

        //method called when stop trading is clicked in the menu
        private void stopTradingToolStripMenuItem_Click(object sender, EventArgs e)
        {
            //enable begin item, and disable stop trading
            stopTradingToolStripMenuItem.Enabled = false;
            beginTradingToolStripMenuItem.Enabled = true;

            //change text from  <<open>> to <<closed>>
            marketToolStripMenuItem.Text = "Market <<Closed>>";
            
            //hide orders and watch menu items
            watchToolStripMenuItem.Visible = false;
            ordersToolStripMenuItem.Visible = false;
        }

        //when exit clicked close form
        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            base.Close();
        }

        private void marketToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        //function called on form load which will populate all the companies into the menu strip twice
        //happens for the order menu and price menu
        //and sets market to closed by default
        private void StockSecuritiesExchange_Load(object sender, EventArgs e)
        {
            marketToolStripMenuItem.Text = "Market <<Closed>>";

            //for each company create 2 menu items that have the text=company name, an event handeler defined below and are added to the tool strip
            foreach (Class_Company comp in this.realTimeData.CompanyList)
            {
                ToolStripMenuItem orderMenuItem = new ToolStripMenuItem();
                orderMenuItem.Text = comp.getCompanyName();
                orderMenuItem.Click += new EventHandler(this.orderClick);
                this.marketByOrderToolStripMenuItem.DropDownItems.Add(orderMenuItem);

                ToolStripMenuItem priceMenuItem = new ToolStripMenuItem();
                priceMenuItem.Text = comp.getCompanyName();
                priceMenuItem.Click += new EventHandler(this.priceClick);
                this.marketByPriceToolStripMenuItem.DropDownItems.Add(priceMenuItem);
            }
            
        }

        //called when the user clicks on one of the dynamically created menu options under Market By Order
        private void orderClick(object sender, EventArgs e)
        {
            ToolStripMenuItem item = (ToolStripMenuItem)sender;

            //iterate through companies to get the current selected company, then create a new market by order form
            //and create a new observer and register the observer 
            foreach (Class_Company currCompany in this.realTimeData.CompanyList)
            {
                if (currCompany.getCompanyName() == item.Text)
                {
                    MarketByOrderForm MBOobserver = new MarketByOrderForm(currCompany);
                    MBOobserver.MdiParent = this;
                    MBOobserver.Text = "Market Depth by Order for " + currCompany.getCompanyName();
                    MBOobserver.Show();
                    
                    this.realTimeData.Register(MBOobserver);
                }
            }
        }

        //called when the user clicks on one of the dynamically created menu options under Market By Order
        private void priceClick(object sender, EventArgs e)
        {
            ToolStripMenuItem item = (ToolStripMenuItem)sender;
            
            //iterate through companies to get the current selected company, then create a new market by order form
            //and create a new observer and register the observer 
            foreach (Class_Company comp in this.realTimeData.CompanyList)
            {
                if (comp.getCompanyName() == item.Text)
                {
                    MarketByPriceForm MBPobserver = new MarketByPriceForm(comp);
                    MBPobserver.MdiParent = this;
                    MBPobserver.Text = "Market Depth by Price for " + comp.getCompanyName();
                    MBPobserver.Show();
                    
                    this.realTimeData.Register(MBPobserver);
                }
            }
        }

        private void watchToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        private void ordersToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        //method called when bid is clicked in the menu, launching a new bid form
        private void bidToolStripMenuItem_Click(object sender, EventArgs e)
        {
            BidOrderForm bid = new BidOrderForm(this.realTimeData);
            bid.MdiParent = this;
            bid.Text = "Place Bid Order Form";
            bid.Show();
        }
        //method called when bid is clicked in the menu, launching a new sell form
        private void sellToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SellOrderForm sell = new SellOrderForm(this.realTimeData);
            sell.MdiParent = this;
            sell.Text = "Place Sell Order Form";
            sell.Show();
        }

        private void marketByOrderToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        //method called when stock stats summary is clicked in the menu
        // and launching a new stock stats form then adding it as an observer
        private void stockStatsSummaryToolStripMenuItem_Click(object sender, EventArgs e)
        {
            StockStateSummaryForm summaryObserver = new StockStateSummaryForm(realTimeData);
            summaryObserver.MdiParent = this;
            summaryObserver.Show();
            this.realTimeData.Register(summaryObserver);
        }

        // orders all the open windows inside this window into a cascaded layout
        private void cascadeToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.LayoutMdi(MdiLayout.Cascade);
        }

        // orders all the open windows inside this window into a horizontal layout
        private void horizontalToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.LayoutMdi(MdiLayout.TileHorizontal);
        }

        // orders all the open windows inside this window into a vertical layout
        private void verticalToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.LayoutMdi(MdiLayout.TileVertical);
        }
    }
}
