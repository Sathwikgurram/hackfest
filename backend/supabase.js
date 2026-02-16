const {createClient}=require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl="https://idsnkmkbtpeoofgtqmdq.supabase.co/";
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlkc25rbWtidHBlb29mZ3RxbWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMTM5MzUsImV4cCI6MjA4Njc4OTkzNX0.XtoWOMwAbCFdn5EYLq5oQK82s_AKRqA2ys9rjeKKaW8";

const supabase=createClient(supabaseUrl,supabaseKey);

module.exports=supabase;