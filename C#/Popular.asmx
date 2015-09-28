<%@ WebService Language="C#" Class="Popular" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;

using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Services;
using System.Collections;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Popular  : System.Web.Services.WebService {

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }

    [WebMethod]
    [ScriptMethod]
    public void insertID(string recipeid)
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["yuvi17CS"].ConnectionString.ToString());
        SqlCommand cmd = new SqlCommand("yuvi17.sp_MostViewed", con);
        cmd.Parameters.Add("@RecipeID", System.Data.SqlDbType.Int).Value = Convert.ToInt32(recipeid);
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        con.Open();
        cmd.ExecuteNonQuery();
        con.Close();
    }

    [WebMethod]
    [ScriptMethod]
    public ArrayList getMostViewed()
    {
        ArrayList lst = new ArrayList();
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["yuvi17CS"].ConnectionString.ToString());
        SqlCommand cmd = new SqlCommand("SELECT TOP(4) RecipeID FROM yuvi17.MostViewed ORDER BY Counter DESC", con);
        SqlDataReader dr;
        con.Open();
        dr = cmd.ExecuteReader();
        if (dr.HasRows)
        {
            while (dr.Read())
            {
                lst.Add(dr["RecipeID"].ToString());
            }
        }

        con.Close();
        return lst;
    }
    
}