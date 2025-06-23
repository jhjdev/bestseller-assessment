<template>
  <div class="coming-soon-page">
    <div class="container">
      <h1>Contact Us</h1>
      <div class="coming-soon-content">
        <p>Our contact page is coming soon!</p>
        <p>In the meantime, you can reach us at <a href="mailto:support@fashionstore.com">support@fashionstore.com</a></p>
        <NuxtLink to="/" class="back-link">Back to Home</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.coming-soon-page {
  padding: 60px 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.coming-soon-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

p {
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: var(--dark-color);
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background-color: var(--accent-color);
}
</style>