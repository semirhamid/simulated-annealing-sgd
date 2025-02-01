<template lang="html">
  <div class="page-container">
    <div class="container">
      <section class="header">
        <h1>Optimization Algorithms</h1>
      </section>
      <div class="algorithms-list">
        <div class="list-item" v-for="algorithm in algorithms" :key="algorithm.num">
          <div class="algorithm-content">
            <div class="algorithm-number">{{algorithm.num}}</div>
            <div class="algorithm-details">
              <h2>{{algorithm.name}}</h2>
              <p>{{algorithm.description}}</p>
              <div class="button-container">
                <router-link :to="algorithm.demolink">
                  <button class="demo-button">Try Demo</button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
      <footer>
        <small>
          &copy; 2018 Eric Schirtzinger
          <br>
          <a href="https://www.eschirtz.com">www.eschirtz.com</a>
        </small>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      algorithms: [
        { 
          num: '01',
          name: 'Simulated Annealing',
          demolink: '/sa',
          description: 'Visualization of Simulated Annealing algorithm and how it can escape local minima through probabilistic jumps. This algorithm is inspired by the physical process of annealing in metallurgy.'
        },
        { 
          num: '02',
          name: 'Stochastic Gradient Descent',
          demolink: '/sgd',
          description: 'Visualization of Stochastic Gradient Descent (SGD) and how it can get stuck in local minima. This helps demonstrate the advantages of SA over traditional gradient-based approaches.'
        },
        {
          num: '03',
          name: 'Metallurgy Process',
          demolink: '/metallurgy',
          description: 'Visualization of the physical annealing process in metallurgy, showing how temperature affects atomic movement and crystal structure formation. This helps understand the inspiration behind the Simulated Annealing algorithm.'
        }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
.page-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 40px 20px;
}

.container {
  max-width: 960px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5em;
  font-weight: 600;
}

.algorithms-list {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.list-item {
  padding: 20px 0;
}

.algorithm-content {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.algorithm-number {
  font-size: 1.5em;
  color: #3498db;
  font-weight: bold;
  min-width: 60px;
}

.algorithm-details {
  flex: 1;
}

h2 {
  color: #2c3e50;
  margin: 0 0 15px 0;
  font-size: 1.8em;
  font-weight: 500;
}

p {
  color: #5a6c7d;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.1em;
}

.button-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.button-container a {
  text-decoration: none;
}

.demo-button {
  background-color: #3498db;
  color: white;
  padding: 2px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  min-width: 120px;
}

.demo-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.divider {
  height: 1px;
  background-color: #e1e8ed;
  margin-top: 20px;
}

.list-item:last-child .divider {
  display: none;
}

footer {
  text-align: center;
  margin-top: 40px;
  color: #5a6c7d;
}

footer a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s ease;
}

footer a:hover {
  color: #2980b9;
}

@media (max-width: 768px) {
  .page-container {
    padding: 20px 10px;
  }

  .algorithm-content {
    flex-direction: column;
    gap: 15px;
  }

  .algorithm-number {
    min-width: auto;
  }

  h1 {
    font-size: 2em;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 1.5em;
  }
}
</style>
