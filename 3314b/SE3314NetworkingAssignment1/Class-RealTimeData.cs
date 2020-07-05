using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE3314NetworkingAssignment1
{
    public class Class_RealTimeData
    {
        //creating a list of companies and observers
        public List<Class_Company> CompanyList = new List<Class_Company>();
        public List<Class_StockMarketDisplay> ObserverList = new List<Class_StockMarketDisplay>();

        //adding companies to the current list of companies in the constructor
        public Class_RealTimeData()
        {
            this.CompanyList.Add(new Class_Company("Microsoft Corporation", "MSFT", 46.13));
            this.CompanyList.Add(new Class_Company("Apple Inc.", "APPL", 105.22));
            this.CompanyList.Add(new Class_Company("Facebook Inc.", "FB", 80.67));
        }
        
        //add an observer to the ObserverList and call update to make sure everything is upto date
        public void Register(Class_StockMarketDisplay observer)
        {
            this.ObserverList.Add(observer);
            observer.Update(this);
        }

        //remove an observer from the ObserverList
        public void Unregister(Class_StockMarketDisplay observer)
        {
            this.ObserverList.Remove(observer);
        }

        // iterate through each observer and call update to change values where needed using realtimedata
        public void Notify()
        {
            foreach (Class_StockMarketDisplay obs in this.ObserverList)
            {
                obs.Update(this);
            }
        }
        
    }
}
