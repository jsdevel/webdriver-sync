package me.joespencer.webdriversynchelpers;

import java.io.OutputStream;
import java.io.PrintStream;

public class ConsoleControl {
  public static void stopOut(){
    System.setOut(new PrintStream(new OutputStream() { 
      @Override
      public void close() {}
      @Override
      public void flush() {}
      @Override
      public void write(byte[] b) {}
      @Override
      public void write(byte[] b, int off, int len) {}
      @Override
      public void write(int b) {}
    }));
  }

  public static void stopErr(){
    System.setErr(new PrintStream(new OutputStream() { 
      @Override
      public void close() {}
      @Override
      public void flush() {}
      @Override
      public void write(byte[] b) {}
      @Override
      public void write(byte[] b, int off, int len) {}
      @Override
      public void write(int b) {}
    }));
  }
}