using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE3314NetworkingAssignment1
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Windows.Forms;

    namespace SE3352Assignment2
    {
        class Program
        {
            static void Main(string[] args)
            {
                //Enable Visaul Styles for slightlty better looking form components
                Application.EnableVisualStyles();
                // simply run the stock securities MDI window
                Application.Run(new StockSecuritiesExchange());
            }
        }
    }
}
