import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;



@Configuration 
public class Appconfig {
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder){
        return builder.build();
    }
}
