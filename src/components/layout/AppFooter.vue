<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-links">
        <div class="link-column">
          <a href="#">FAQ</a>
          <a href="#">Investor Relations</a>
          <a href="#">Ways to Watch</a>
          <a href="#">Corporate Information</a>
          <a href="#">Netflix Originals</a>
        </div>
        <div class="link-column">
          <a href="#">Help Center</a>
          <a href="#">Jobs</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact Us</a>
        </div>
        <div class="link-column">
          <a href="#">Account</a>
          <a href="#">Redeem Gift Cards</a>
          <a href="#">Privacy</a>
          <a href="#">Speed Test</a>
        </div>
        <div class="link-column">
          <a href="#">Media Center</a>
          <a href="#">Buy Gift Cards</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Legal Notices</a>
        </div>
      </div>
      <div class="copyright">
        <p>© 2023 Netflix Clone Project. This is not the real Netflix.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #141414;
  color: #757575;
  padding: 3rem 2rem;
  margin-top: 2rem;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer-links {
    grid-template-columns: 1fr;
  }
}

.link-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-column a {
  color: #757575;
  text-decoration: none;
  font-size: 0.8rem;
}

.link-column a:hover {
  text-decoration: underline;
}

.copyright {
  margin-top: 2rem;
  font-size: 0.8rem;
}
</style>