import { Component } from "react";
import styles from "./ErrorBoundary.module.scss";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Kutilmagan xato:", error, errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  // ErrorBoundary.jsx faylingizdagi render qismini shunday almashtiring:
  render() {
    // Agar klass komponent o'zi xato tutsa YOKI router uni errorElement sifatida chaqirgan bo'lsa
    if (this.state.hasError || !this.props.children) {
      return (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Nimadir xato ketdi</h1>
          <p className={styles.description}>
            Kutilmagan xatolik yuz berdi. Sahifani qayta yuklab ko'ring.
          </p>
          <button type="button" className={styles.button} onClick={this.handleReload}>
            Bosh sahifaga qaytish
          </button>
        </div>
      );
    }

    return this.props.children;
  }

  //   render() {
  //     if (this.state.hasError) {
  //       return (
  //         <div className={styles.wrapper}>
  //           <h1 className={styles.title}>Nimadir xato ketdi</h1>
  //           <p className={styles.description}>
  //             Kutilmagan xatolik yuz berdi. Sahifani qayta yuklab ko'ring.
  //           </p>
  //           <button type="button" className={styles.button} onClick={this.handleReload}>
  //             Bosh sahifaga qaytish
  //           </button>
  //         </div>
  //       );
  //     }

  //     return this.props.children;
  //   }
}
